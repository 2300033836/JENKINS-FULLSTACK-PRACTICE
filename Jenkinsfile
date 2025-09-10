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
                    // Fail pipeline if build fails
                    bat 'npm run build || exit /b 1'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                script {
                    def buildDir = "${WORKSPACE}\\FRONTEND\\Demoreactapp\\build"
                    if (fileExists(buildDir)) {
                        echo "🔹 Deploying frontend from ${buildDir}..."
                        bat """
                        if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\demoreactapp" (
                            rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\demoreactapp"
                        )
                        mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\demoreactapp"
                        xcopy /E /I /Y ${buildDir}\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\demoreactapp"
                        """
                    } else {
                        error "❌ Frontend build folder not found: ${buildDir}"
                    }
                }
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('Demospringbootproject') {  // Folder containing pom.xml
                    echo '🔹 Building backend with Maven...'
                    bat 'mvn clean package || exit /b 1'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                script {
                    def warFile = "${WORKSPACE}\\Demospringbootproject\\target\\Demospringboot.war"
                    if (fileExists(warFile)) {
                        echo "🔹 Deploying backend WAR: ${warFile}"
                        bat """
                        if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Demospringboot.war" (
                            del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Demospringboot.war"
                        )
                        if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Demospringboot" (
                            rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Demospringboot"
                        )
                        copy "${warFile}" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\"
                        """
                    } else {
                        error "❌ Backend WAR file not found: ${warFile}"
                    }
                }
            }
        }

    }

    post {
        success {
            echo '✅ Deployment Successful! Frontend on port 1880, Backend on port 8080.'
        }
        failure {
            echo '❌ Pipeline Failed. Check logs.'
        }
    }
}
