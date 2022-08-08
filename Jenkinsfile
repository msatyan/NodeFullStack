pipeline {
    agent {
        label 'mashebali'
    }
    stage('Build and Push Docker Image...') {
        steps {
            script {
                // CUSTOM REGISTRY
                docker.withRegistry('https://099242274141.dkr.ecr.eu-west-1.amazonaws.com') {

                    /* Build the container image */
                    def dockerImage = docker.build("backend:${env.BUILD_ID}")

                    /* Push the container to the custom Registry */
                    dockerImage.push()

            }
            /* Remove docker image*/
            sh 'docker rmi -f my-image:${env.BUILD_ID}'
            }
        } 
    }
}
