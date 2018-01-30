pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
    }
    
  }
  stages {
    stage('Build') {
      steps {
        sh 'echo "Completed"'
      }
    }
    stage('Test') {
      steps {
        sh 'echo "Run Tests"'
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploy to cloud'
      }
    }
  }
  environment {
    build = 'dev'
  }
}