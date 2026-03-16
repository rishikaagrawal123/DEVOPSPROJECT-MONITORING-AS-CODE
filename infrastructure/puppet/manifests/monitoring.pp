class monitoring {

  exec { 'start-monitoring-stack':
    command => 'docker compose -f /code/infrastructure/docker/docker-compose.yml up -d',
    path    => ['/usr/bin','/bin'],
  }

}