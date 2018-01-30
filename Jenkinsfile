pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
    }
    
  }
  stages {
    stage('Build') {
      agent {
        dockerfile {
          filename 'Dockerfile'
        }
        
      }
      steps {
        pwd(tmp: true)
        git(url: 'https://github.com/Renjuju/Checkers', branch: 'master', changelog: true, poll: true)
      }
    }
  }
  environment {
    build = 'dev'
  }
}