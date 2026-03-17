node default {

  include monitoring
  notify { 'Puppet applied monitoring configuration successfully':
  }

}