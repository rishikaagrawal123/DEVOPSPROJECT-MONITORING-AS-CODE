class monitoring {

  file { '/opt/nagios/etc/objects/hosts.cfg':
    ensure  => file,
    source  => '/code/monitoring/nagios/hosts.cfg',
    mode    => '0644',
  }

  file { '/opt/nagios/etc/objects/services.cfg':
    ensure  => file,
    source  => '/code/monitoring/nagios/services.cfg',
    mode    => '0644',
  }

  exec { 'restart-nagios':
    command => 'service nagios restart',
    path    => ['/bin','/usr/bin'],
    refreshonly => true,
  }

}