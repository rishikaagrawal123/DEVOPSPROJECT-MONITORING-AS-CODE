class monitoring {

  exec { 'start-monitoring-stack':
    command => '/usr/bin/docker compose -f /code/infrastructure/docker/docker-compose.yml up -d',
    path    => ['/usr/local/bin', '/usr/bin', '/bin'],
    onlyif  => 'which docker',
  }

}