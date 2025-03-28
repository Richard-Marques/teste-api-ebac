pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'main', url: 'https://github.com/Richard-Marques/teste-api-ebac.git'
                sh 'npm install'
                sh 'apt-get update && apt-get install -y netcat'
            }
        }
        stage('Start Server') {
            steps {
                sh 'npx serverest'
            }
        }
        stage('Wait for Server') {
            steps {
                sh '''
                # Verificar se o servidor está rodando na porta 3000 usando nc
                for i in {1..10}; do
                    nc -z localhost 3000 && break
                    echo "Waiting for the server to be available..."
                    sleep 1
                done
                '''
            }
        }
        stage('Test') {
            steps {
                sh 'NO_COLOR=1 npm test'
            }
        }
    }
}