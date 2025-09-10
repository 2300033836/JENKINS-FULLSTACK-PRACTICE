pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('FRONTEND/Demoreactapp') {  // Correct frontend folder
                    echo '🔹 Installing frontend dependencies...'
                    bat 'npm install'

                    echo '🔹 Building frontend...'
                    bat 'npm run build || exit /b 1'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\ReactSpringBootCRUD" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\ReactSpringBootCRUD"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\ReactSpringBootCRUD"
                xcopy /E /I /Y FRONTEND\\Demoreactapp\\build\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\ReactSpringBootCRUD"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
    steps {
        dir('BACKEND/Demospringbootproject') {  // Correct folder path
            echo '🔹 Building backend with Maven...'
            bat 'mvn clean package || exit /b 1'
        }
        }
    }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Demospringboot.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Demospringboot.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Demospringboot" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Demospringboot"
                )
                copy "Demospringbootproject\\target\\Demospringboot.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\"
                '''
            }
        }

    }

    post {
        success {
            echo '✅ Deployment Successful! Frontend on /ReactSpringBootCRUD, Backend on /Demospringboot'
        }
        failure {
            echo '❌ Pipeline Failed. Check logs.'
        }
    }
}
