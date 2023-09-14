pipeline {
    agent any
    stages {
        stage('Build') {
            steps{
                //Use Maven to build the code
                echo 'mvn clean package'
            }
        }

        stage('Unit and Integration Tests') {
            steps{
                //Use testing tools.( here we also can use maven to generally test, but Maven is not the spefic testing tool)
                echo 'mvn test'
            }
        }

        stage('Code Analysis') {
            steps{
                echo 'sonar-scanner'
            }
        }

        stage('Security Scan') {
            steps{
                echo 'security-scan.bat'
            }
        }

        stage('Deploy to Staging') {
            steps{
                echo 'deploy-to-staging.bat'
            }
        }

        stage('Integration Tests on Staging') {
            steps{
                echo 'mvn verify'
            }
        }

        stage('Deploy to Production') {
            steps{
                echo 'deploy-to-production.bat'
            }
        }
    }

    post {
        success{
            emailext (
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