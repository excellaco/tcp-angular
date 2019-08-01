void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/excellaco/tcp-angular"],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}

pipeline {
  agent {
        docker {
            image 'duluca/minimal-node-chromium'
        }
    }
   environment {
     HOME = '.'
   }
  stages {
    stage('Checkout') {
      steps {
        //slackSend(channel: '#tcp-angular', color: '#FFFF00', message: ":jenkins-triggered: Build Triggered - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
        checkout scm
      }
    }
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Test') {
      steps {
        sh 'npm run test:headless -- --watch false --code-coverage'
      }
    }
    stage('SonarQube analysis') {
      steps{
        withSonarQubeEnv('default') {
          sh 'sonar'
        }
      }
    }
  }
  //post {
  //  success {
  //      setBuildStatus("Build succeeded", "SUCCESS");
  //      slackSend(channel: '#tcp-angular', color: '#00FF00', message: ":jenkins_ci: Build Successful!  ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) :jenkins_ci:")
  //  }
  //  failure {
  //      setBuildStatus("Build failed", "FAILURE");
  //      slackSend(channel: '#tcp-angular', color: '#FF0000', message: ":alert: :jenkins_exploding: *Build Failed!  WHO BROKE THE FREAKING CODE??* ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) :jenkins_exploding: :alert:")
  //  }
  //}
}
