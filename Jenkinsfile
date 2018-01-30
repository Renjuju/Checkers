pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
    }
    
  }
  stages {
    stage('Test') {
      steps {
        sh 'echo "Completed"'
      }
    }
    stage('Deploy') {
      steps {
        sh 'echo "deploy"'
      }
    }
  }
  environment {
    build = 'dev'
  }
}