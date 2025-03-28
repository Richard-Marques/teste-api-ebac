pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'main', url: 'https://github.com/Richard-Marques/teste-api-ebac.git'
                sh 'npm install'
                sh 'npx serverest &'
                sh 'while ! nc -z localhost 3000; do sleep 1; done'
            }
        }
        stage('Test') {
            steps {
                sh 'NO_COLOR=1 npm test'  // Roda o Cypress
            }
        }
    }
}