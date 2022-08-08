pipeline {
    agent {
        label 'mashebali'
    }
    stages {
        stage('Build and Push backend Docker Image...') {
            steps {
                script {

                    sh """
                        docker build -t 099242274141.dkr.ecr.eu-west-1.amazonaws.com/backend:${env.BUILD_ID} -f Dockerfile-backend .
                        """
                }
            }
        } 
    }
}
