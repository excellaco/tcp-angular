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
      label 'excellanator'
    }
    environment {
     HOME = '.'
    }
    stages {
      stage('Checkout') {
        agent { docker 'duluca/minimal-node-chromium' }
        steps {
          slackSend(channel: '#tcp-angular', color: '#FFFF00', message: ":jenkins-triggered: Build Triggered - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
          checkout scm
        }
      }
      stage('Install') {
        agent { docker 'duluca/minimal-node-chromium' }
        steps {
          sh 'npm ci'
        }
      }
      stage('Build') {
        agent { docker 'duluca/minimal-node-chromium' }
        steps {
          sh 'npm run build:prod'
        }
      }
      stage('Test') {
        agent { docker 'duluca/minimal-node-chromium' }
        steps {
          sh 'npm run test:headless -- --watch false --code-coverage'
        }
      }
      stage('SonarQube analysis') {
        agent { docker 'daneweber/ubuntu-node-java' }
        steps{
            withSonarQubeEnv('default') {
              sh 'npm run sonar'
          }
        }
      }
      stage('Build Dev Image'){
        steps{
          nodejs('12') {
            sh './tcp-angular-ecs/package-for-ecs dev'
          }
        }
      }
      stage('Deploy Dev Image'){
        steps{
          dir('tcp-angular-ecs'){
            sh './deploy-to-ecs dev'
          }
        }
      }
      /* stage('Build Test Image'){
        steps{
          nodejs('12') {
            sh 'npm install import-sort'
            sh './tcp-angular-ecs/package-for-ecs test'
          }
        }
      }
      stage('Deploy Test Image'){
        steps{
          dir('tcp-angular-ecs'){
            sh './deploy-to-ecs test'
          }
        }
      }
      stage('Build Prod Image'){
        steps{
          nodejs('12') {
            sh 'npm install import-sort'
            sh './tcp-angular-ecs/package-for-ecs prod'
          }
        }
      }
      stage('Deploy Prod Image'){
        steps{
          dir('tcp-angular-ecs'){
            sh './deploy-to-ecs prod'
          }
        }
      } */
    }
    post {
      success {
          setBuildStatus("Build succeeded", "SUCCESS");
          slackSend(channel: '#tcp-angular', color: '#00FF00', message: ":jenkins_ci: Build Successful!  ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) :jenkins_ci:")
        }
      failure {
          setBuildStatus("Build failed", "FAILURE");
          slackSend(channel: '#tcp-angular', color: '#FF0000', message: ":alert: :jenkins_exploding: *Build Failed!  WHO BROKE THE FREAKING CODE??* ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) :jenkins_exploding: :alert:")
        }
    }
}
