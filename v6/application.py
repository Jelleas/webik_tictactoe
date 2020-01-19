import os
import uuid

from game import join_game, get_game, set_tile

from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions
from werkzeug.security import check_password_hash, generate_password_hash

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
Session(app)


@app.route("/")
def index():
    """Play tictactoe"""
    session["id"] = str(uuid.uuid4())

    join_game(session["id"])

    return render_template("index.html")


@app.route("/api/move")
def move():
    x = int(request.args.get("x"))
    y = int(request.args.get("y"))
    player = session["id"]
    game = get_game(player)

    set_tile(game, player, x, y)

    return jsonify(game)


@app.route("/api/status")
def status():
    player = session["id"]
    return jsonify(get_game(player))
