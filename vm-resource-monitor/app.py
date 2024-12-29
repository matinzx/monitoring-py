from flask import Flask, render_template
import paramiko
import re

app = Flask(__name__)

def get_vm_resources(ip, username, password):
    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(ip, username=username, password=password)
        
        # اجرای دستورات برای گرفتن اطلاعات
        stdin, stdout, stderr = ssh.exec_command("free -h && df -h")
        output = stdout.read().decode('utf-8')
        ssh.close()

        # استخراج اطلاعات رم و دیسک
        memory_match = re.search(r'Mem:\s+(\S+)\s+(\S+)', output)  # کل و خالی رم
        disk_match = re.search(r'/dev/\S+\s+(\S+)\s+(\S+)\s+(\S+)', output)  # کل، پر، خالی دیسک

        return {
            "ip": ip,
            "total_ram": memory_match.group(1) if memory_match else "N/A",
            "free_ram": memory_match.group(2) if memory_match else "N/A",
            "total_disk": disk_match.group(1) if disk_match else "N/A",
            "used_disk": disk_match.group(2) if disk_match else "N/A",
            "free_disk": disk_match.group(3) if disk_match else "N/A"
        }

    except Exception as e:
        return {"ip": ip, "error": str(e)}

def get_all_vm_resources():
    results = []
    try:
        with open("../ip/ips.text", "r") as file:
            for line in file:
                ip, username, password = line.strip().split(",")
                results.append(get_vm_resources(ip, username, password))
    except Exception as e:
        results.append({"error": str(e)})
    return results

@app.route('/')
def index():
    results = get_all_vm_resources()
    return render_template('index.html', results=results)

if __name__ == '__main__':
    app.run(debug=True)
