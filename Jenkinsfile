pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'main', url: 'https://github.com/Richard-Marques/teste-ebac-ui.git'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'NO_COLOR=1 npm test'
            }
        }
    }
}