from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash
app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/search')
def search():
    return render_template('search.html')


if __name__ == '__main__':
    app.debug = True
    app.run()
