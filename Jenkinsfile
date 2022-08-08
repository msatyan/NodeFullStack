pipeline {
    agent {
        label 'mashebali'
    }
    stages {
        stage('Build and Push backend Docker Image...') {
            steps {
                script {

                    def repository = "099242274141.dkr.ecr.eu-west-1.amazonaws.com/backend"
                    def tag = "${env.BUILD_ID}"
                    def dockerfile = "Dockerfile-backend"
                    sh """
                       docker build -t ${repository}:${tag} -f ${dockerfile} .
                       docker push ${repository}:${tag}
                        """
                }
            }
        } 
    }
}
