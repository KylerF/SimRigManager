import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { HttpLink } from 'apollo-angular/http';

import { APIHelper } from 'helpers/api-helper';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  // Create an http link:
  const http = httpLink.create({
    uri: `${APIHelper.getBaseUrl()}/graphql`
  })

  // Create a WebSocket link:
  const ws = new WebSocketLink({
    uri: `${APIHelper.getBaseUrl('ws')}/graphql`,
    options: {
      reconnect: true
    }
  })

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
    cache: new InMemoryCache(),
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
