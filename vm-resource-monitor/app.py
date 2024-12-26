from flask import Flask, jsonify, render_template
import psutil
import platform

app = Flask(__name__)

def get_system_info():
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    uname = platform.uname()
    
    return {
        'system': {
            'os': uname.system,
            'node_name': uname.node,
            'release': uname.release,
            'version': uname.version,
            'machine': uname.machine,
            'processor': uname.processor
        },
        'ram': {
            'total': memory.total / (1024 ** 3),
            'used': memory.used / (1024 ** 3),
            'available': memory.available / (1024 ** 3)
        },
        'disk': {
            'total': disk.total / (1024 ** 3),
            'used': disk.used / (1024 ** 3),
            'free': disk.free / (1024 ** 3)
        }
    }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/system-info')
def system_info():
    return jsonify(get_system_info())

if __name__ == '__main__':
    app.run(debug=True)
