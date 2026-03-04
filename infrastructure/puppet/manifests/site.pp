node default {

  package { 'nagios':
    ensure => installed,
  }

  service { 'nagios':
    ensure => running,
    enable => true,
  }

}