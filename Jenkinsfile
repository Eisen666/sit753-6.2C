pipeline {
    agent any
    stages {
        stage('Build') {
            steps{
                //Use Maven to build the code
                sh 'mvn clean package'
            }
        }

        stage('Unit and Integration Tests') {
            steps{
                //Use testing tools.( here we also can use maven to generally test, but Maven is not the spefic testing tool)
                sh 'mvn test'
            }
        }

        stage('Code Analysis') {
            steps{
                sh 'sonar-scanner'
            }
        }

        stage('Security Scan') {
            steps{
                sh 'owasp-ap-scan'
            }
        }

        stage('Deploy to Staging') {
            steps{
                sh 'aws deploy-to-staging'
            }
        }

        stage('Integration Tests on Staging') {
            steps{
                sh 'mvn verify'
            }
        }

        stage('Deploy to Production') {
            steps{
                sh 'aws deploy-to-production'
            }
        }
    }

    post {
        success{
            exailext (
            subject: "Pipeline Successful",
            body: "The Jenkins pipleline has completed successfully.",
            attachmentPattern: '**/build.log',
            to: 'eisenlai321@gmail.com'
        )
        }

        failure{
            emailext(
                subject:"Pipeline Failed",
                body:"The Jenkins pipeline has failed.",
                attachmentPattern: '**/build.log',
                to: 'eisenlai321@gmail.com'
            )
        }
    }


}