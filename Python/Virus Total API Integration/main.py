import requests
import hashlib
import json


def scan_files(key, path_to_files):

    url = "https://www.virustotal.com/api/v3/files/"
    headers = {"x-apikey": key}

    response_ = []
    for i in path_to_files:
        with open(i, "rb") as f:
            bytes = f.read()
            hash = hashlib.sha256(bytes).hexdigest()
            url = url + hash
            response = requests.get(url, headers=headers)
            json_response = json.loads(
                response.content.decode("utf8").replace("'", '"')
            )
            response_.append((i, json_response))

    return response_


def upload_files(key, path_to_files):

    url = "https://www.virustotal.com/api/v3/files/"
    headers = {"x-apikey": key}

    response_ = []
    for i in path_to_files:
        with open(i, "rb") as f:
            form = {"file": f}
            response = requests.post(url, headers=headers, files=form)
            json_response = json.loads(
                response.content.decode("utf8").replace("'", '"')
            )
            response_.append((i, json_response))
    return response_
