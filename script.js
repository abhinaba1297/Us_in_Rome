const STOPS = [
  {
    location: "Rome, Italy",
    text: `Hi my love ❤️

I know I couldn’t be there with you for this trip.

But I didn’t want you to experience Rome alone.

So I made something for you...

Let’s go through your journey together ✨`,
    intro: true
  },
  {
    location: "Colosseum",
    image: "images/1-colosseum.jpg",
    text: `This is where I would’ve looked at you first...

and then pretended I was looking at the Colosseum.

I know this place is historic,
but if I were there,
you would still be the main event for me.`
  },
  {
    location: "Trevi Fountain",
    image: "images/2-trevi.jpg",
    text: `You’d make a wish here...

and I’d probably act casual.

But secretly,
I’d be wishing for more trips with you,
more memories with you,
more of us.`
  },
  {
    location: "Pantheon",
    image: "images/3-pantheon.jpg",
    text: `We’d stand here together
and I’d probably go quiet for a second.

Not because I had nothing to say—
but because sometimes being beside you
already feels like enough.`
  },
  {
    location: "Vatican Museum",
    image: "images/4-vatican.jpg",
    text: `You know what I would’ve loved most here?

Not the museum.
Not the paintings.
Not even the ceilings.

Just walking beside you slowly,
hearing your voice,
and sharing every little reaction with you.`
  },
  {
    location: "Sistine Chapel",
    image: "images/5-sistine.jpg",
    text: `I think this would’ve been one of those moments
where neither of us says much.

Just a look.
A small smile.
And that quiet feeling of,
“I’m really glad I’m here with you.”`
  },
  {
    location: "Sant'Angelo Bridge",
    image: "images/6-santangelo.jpg",
    text: `This feels like one of those places
where I would’ve wanted to hold your hand a little tighter.

Not because I’d be afraid of losing you—
but because moments like this
deserve to be felt together.`
  },
  {
    location: "Walk along the Tiber River",
    image: "images/7-tiber.jpg",
    text: `I can already imagine this part so clearly.

Just us walking slowly,
talking about everything and nothing,
and me wishing the road would stretch
a little longer
so I could stay in that moment with you.`
  },
  {
    location: "Dinner in Trastevere",
    image: "images/8-trastevere.jpg",
    text: `And this...
this would’ve been my favorite part.

A little table.
Good food.
Rome glowing around us.

And me,
quietly falling in love with you
all over again.`
  }
];

const FINAL_NOTE = `Even if I couldn't be there with you physically,
please know that a part of me is walking with you through every street,
every monument,
every little beautiful moment of Rome.

I made these because I wanted you to feel me beside you.

And one day,
we’ll do all of this for real.

I love you.
Sempre com você. ❤️

— Abhi`;

let currentIndex = 0;
let musicStarted = false;

const locationText = document.getElementById("locationText");
const imageWrap = document.getElementById("imageWrap");
const storyText = document.getElementById("storyText");
const controls = document.getElementById("controls");
const progressBar = document.getElementById("progressBar");
const bgMusic = document.getElementById("bgMusic");

function startMusic() {
  if (!bgMusic || musicStarted) return;

  bgMusic.volume = 0.65;
  bgMusic.load();

  bgMusic.play()
    .then(() => {
      musicStarted = true;
      render();
    })
    .catch((err) => {
      console.log("Music failed to start:", err);
      alert("Tap again to start the music 🎵");
    });
}

function updateProgress() {
  const totalScreens = STOPS.length + 1; // includes final page
  const progress = (currentIndex / (totalScreens - 1)) * 100;
  progressBar.style.width = `${progress}%`;
}

function createButton(label, className, onClick) {
  const btn = document.createElement("button");
  btn.className = `btn ${className}`;
  btn.textContent = label;
  btn.addEventListener("click", onClick);
  return btn;
}

function renderIntro(stop) {
  locationText.textContent = stop.location;
  imageWrap.innerHTML = "";
  storyText.textContent = stop.text;

  controls.innerHTML = "";
  controls.appendChild(
    createButton("Start with music 🎵", "btn-primary", () => {
      startMusic();
      currentIndex = 1;
      render();
    })
  );
  controls.appendChild(
    createButton("Start quietly", "btn-secondary", () => {
      currentIndex = 1;
      render();
    })
  );

  const musicLabel = document.createElement("div");
  musicLabel.className = "music-indicator";
  musicLabel.textContent = "Best experienced on a computer, with sound on.";
  controls.appendChild(musicLabel);
}

function renderStop(stop) {
  locationText.textContent = stop.location;

  imageWrap.innerHTML = "";
  if (stop.image) {
    const img = document.createElement("img");
    img.src = stop.image;
    img.alt = stop.location;
    img.className = "story-image";
    imageWrap.appendChild(img);
  }

  storyText.textContent = stop.text;

  controls.innerHTML = "";

  if (currentIndex > 1) {
    controls.appendChild(
      createButton("Back", "btn-secondary", () => {
        currentIndex--;
        render();
      })
    );
  }

  controls.appendChild(
    createButton(
      currentIndex === STOPS.length - 1 ? "See the final note ❤️" : "Next stop →",
      "btn-primary",
      () => {
        currentIndex++;
        render();
      }
    )
  );

  if (musicStarted) {
    controls.appendChild(
      createButton("Pause music", "btn-secondary", () => {
        bgMusic.pause();
        musicStarted = false;
        render();
      })
    );
  } else {
    controls.appendChild(
      createButton("Play music 🎵", "btn-secondary", () => {
        startMusic();
      })
    );
  }
}

function renderFinal() {
  locationText.textContent = "For you, always";
  imageWrap.innerHTML = "";
  storyText.innerHTML = `
    <div class="story-text">Before this ends... one more thing.</div>
    <div class="final-note">${FINAL_NOTE}</div>
    <div class="gallery">
      <img src="images/1-colosseum.jpg" alt="Colosseum">
      <img src="images/2-trevi.jpg" alt="Trevi Fountain">
      <img src="images/3-pantheon.jpg" alt="Pantheon">
      <img src="images/4-vatican.jpg" alt="Vatican Museum">
      <img src="images/5-sistine.jpg" alt="Sistine Chapel">
      <img src="images/6-santangelo.jpg" alt="Sant'Angelo Bridge">
      <img src="images/7-tiber.jpg" alt="Tiber River">
      <img src="images/8-trastevere.jpg" alt="Trastevere">
    </div>
  `;

  controls.innerHTML = "";
  controls.appendChild(
    createButton("Go back through our trip", "btn-secondary", () => {
      currentIndex = 1;
      render();
    })
  );

  if (musicStarted) {
    controls.appendChild(
      createButton("Pause music", "btn-secondary", () => {
        bgMusic.pause();
        musicStarted = false;
        render();
      })
    );
  } else {
    controls.appendChild(
      createButton("Play music 🎵", "btn-secondary", () => {
        startMusic();
      })
    );
  }
}

function render() {
  updateProgress();

  if (currentIndex === 0) {
    renderIntro(STOPS[0]);
    return;
  }

  if (currentIndex >= STOPS.length) {
    renderFinal();
    return;
  }

  renderStop(STOPS[currentIndex]);
}

render();
