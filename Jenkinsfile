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

        stage('Build Backend') {
    steps {
        dir('BACKEND/Demospringbootproject') {
            echo "🔹 Building backend..."
            bat '"C:\\Program Files\\Apache\\maven\\bin\\mvn.cmd" clean package -DskipTests'
        }
    }
}

stage('Deploy Backend to Tomcat') {
    steps {
        script {
            def warFile = "${workspace}\\BACKEND\\Demospringbootproject\\target\\Demospringboot.war"
            def tomcatWebapps = '"C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps"'
            bat "if exist ${tomcatWebapps}\\Demospringboot (rmdir /S /Q ${tomcatWebapps}\\Demospringboot)"
            bat "copy \"${warFile}\" ${tomcatWebapps}\\Demospringboot.war"
            echo "🔹 Backend deployed!"
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
