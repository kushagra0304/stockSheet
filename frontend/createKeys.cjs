try {
    const process = require('child_process');

    const currentIP = process
        .execSync(`ifconfig | grep 'inet ' | grep -v 127.0.0.1 | awk '{print $2}'`)
        .toString()
        .trim();

    process.execSync(`mkcert localhost ${currentIP} 127.0.0.1 ::1`);

    console.log("Created keys successfully");
} catch (e) {
    console.log("Error creating keys: " + e.message);
    process.exit(1);
}