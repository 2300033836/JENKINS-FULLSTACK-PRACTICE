pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('FRONTEND/Demoreactapp') {  // Frontend folder
                    echo '🔹 Installing frontend dependencies...'
                    bat 'npm install'

                    echo '🔹 Building frontend...'
                    bat 'npm run build || exit /b 1'  // Uses Vite's build config (outDir: build)
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                script {
                    def frontendBuild = "${WORKSPACE}\\FRONTEND\\Demoreactapp\\build"
                    if (fileExists(frontendBuild)) {
                        echo "🔹 Deploying frontend from ${frontendBuild}..."
                        bat """
                        if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\ReactSpringBootCRUD" (
                            rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\ReactSpringBootCRUD"
                        )
                        mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\ReactSpringBootCRUD"
                        xcopy /E /I /Y ${frontendBuild}\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\ReactSpringBootCRUD"
                        """
                    } else {
                        error "❌ Frontend build folder not found: ${frontendBuild}"
                    }
                }
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                script {
                    // Auto-detect backend folder containing pom.xml
                    def backendFolder = ''
                    bat 'dir /B /S pom.xml > pom_files.txt'
                    def pomFiles = readFile('pom_files.txt').split('\n')
                    for (f in pomFiles) {
                        if (f.contains('Demospringbootproject')) {  // Adjust to your backend folder
                            backendFolder = f.replace('\\pom.xml','').replace("${WORKSPACE}\\","")
                            break
                        }
                    }

                    if (backendFolder == '') {
                        error "❌ Could not find backend folder containing pom.xml"
                    } else {
                        echo "🔹 Backend folder detected: ${backendFolder}"
                        dir(backendFolder) {
                            bat 'mvn clean package || exit /b 1'
                        }
                    }
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
            echo '✅ Fullstack Deployment Successful! Frontend on /ReactSpringBootCRUD, Backend on /Demospringboot'
        }
        failure {
            echo '❌ Pipeline Failed. Check logs for details.'
        }
    }
}
