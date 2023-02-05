import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from '@apollo/client/utilities'
import { HttpLink } from 'apollo-angular/http';

import { APIHelper } from 'helpers/api-helper';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  // Create an http link:
  const http = httpLink.create({
    uri: `${APIHelper.getBaseUrl()}/graphql`
  })

  // Create a WebSocket link:
  const ws = new GraphQLWsLink(
    createClient({
      url: `${APIHelper.getBaseUrl('ws')}/graphql`,
      retryAttempts: 0 // retry indefinitely
    })
  );

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query)
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    ws,
    http
  )

  return {
    link,
    cache: new InMemoryCache({
      addTypename: false
    }),
  }
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
