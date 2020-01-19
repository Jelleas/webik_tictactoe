import os
import uuid

from game import join_game, get_game, set_tile

from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions
from werkzeug.security import check_password_hash, generate_password_hash

from flask_socketio import SocketIO

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

app.config["SECRET_KEY"] = "very_secret!"

Session(app)

socketio = SocketIO(app, ping_interval=4, ping_timeout=10)


@app.route("/")
def index():
    """Play tictactoe"""
    return render_template("index.html")


@socketio.on("join")
def join():
    player = request.sid
    join_game(player)


@socketio.on("move")
def move(data):
    x = int(data["x"])
    y = int(data["y"])

    player = request.sid
    game = get_game(player)

    set_tile(game, player, x, y)

    for player in game["players"]:
        socketio.emit("moved", game, room=player)

socketio.run(app, debug=True)
