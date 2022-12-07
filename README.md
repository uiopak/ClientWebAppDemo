# ClientWebAppDemo
Demo: http://demo.cr.kida.ml/contacts

To run:
```
git clone https://github.com/uiopak/ClientWebAppDemo.git
cd .\ClientWebAppDemo\ClientWebAppDemo
docker build -f Dockerfile --force-rm -t uiopak_demo --target final  ".\.."
docker run --name uiopak_demo -p 80:80 -d uiopak_demo:latest
```
