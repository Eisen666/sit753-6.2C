pipeline {
    agent any
    stages {
        stage('Build') {
            steps{
                //Use Maven to build the code
                bat 'mvn clean package'
            }
        }

        stage('Unit and Integration Tests') {
            steps{
                //Use testing tools.( here we also can use maven to generally test, but Maven is not the spefic testing tool)
                bat 'mvn test'
            }
        }

        stage('Code Analysis') {
            steps{
                bat 'sonar-scanner'
            }
        }

        stage('Security Scan') {
            steps{
                bat 'security-scan.bat'
            }
        }

        stage('Deploy to Staging') {
            steps{
                bat 'deploy-to-staging.bat'
            }
        }

        stage('Integration Tests on Staging') {
            steps{
                bat 'mvn verify'
            }
        }

        stage('Deploy to Production') {
            steps{
                bat 'deploy-to-production.bat'
            }
        }
    }

    post {
        success{
            exailext (
            subject: "Pipeline Successful",
            body: "The Jenkins pipleline has completed successfully.",
            attachmentsPattern: '**/build.log',
            to: 'eisenlai321@gmail.com'
        )
        }

        failure{
            emailext(
                subject:"Pipeline Failed",
                body:"The Jenkins pipeline has failed.",
                attachmentsPattern: '**/build.log',
                to: 'eisenlai321@gmail.com'
            )
        }
    }


}