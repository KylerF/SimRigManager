using iRacingSDK;

namespace windows_service;

public class Worker : BackgroundService
{
  private readonly ILogger<Worker> _logger;

  public Worker(ILogger<Worker> logger)
  {
    _logger = logger;
  }

  void iRacing_NewData(DataSample data)
  {
    var telemetry = data.Telemetry;
    _logger.LogInformation($"Traction Control: {telemetry}");
  }


  protected override async Task ExecuteAsync(CancellationToken stoppingToken)
  {
    iRacing.NewData += iRacing_NewData;
    iRacing.StartListening();

    while (!stoppingToken.IsCancellationRequested)
    {
      await Task.Delay(30, stoppingToken);
    }
  }
}
