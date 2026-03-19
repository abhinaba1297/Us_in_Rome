const STOPS = [
  {
    location: "Rome, Italy",
    text: `Hi meu amor ❤️

I know I couldn’t be there with you for this trip.

But I didn’t want you to experience Rome alone.

So I made something for you...

Let’s go through your journey together ✨`,
    intro: true
  },
  {
    location: "Colosseum",
    image: "images/1-colosseum.png",
    text: `Babe, this is where I would’ve looked at you first...

and then pretended I was looking at the Colosseum.

I know this place is historic,
but if I were there,
you would still be the main event for me, baby.`
  },
  {
    location: "Trevi Fountain",
    image: "images/2-trevi.png",
    text: `You’d make a wish here babe...

and I’d make a wish to have both of us together with the
love and connection that only increases every day. I'd
wish that we close the distance early next year and
never have to love each other through screens again.
Oh no, babe, did I already tell you my wish kkkkkkk

But, honestly, what more can I even wish for bebe,
when I already have you. You're my biggest wish
that has been fulfilled already, baby ❤️`
  },
  {
    location: "Pantheon",
    image: "images/3-pantheon.png",
    text: `Babe, we’d stand here together
and I’d probably go quiet for a second (which you know is difficult for me kkkk).

Not because I had nothing to say!
But because I know babe, that being beside you
already feels like enough.`
  },
  {
    location: "Vatican Museum",
    image: "images/4-vatican.png",
    text: `You know what I would’ve loved most here?

Not the museum.
Not the paintings.
Not even the ceilings.
I'll just appreciate how absolutely beautiful you are,
while you appreciate everything else babe.

I'd just walk beside you slowly,
hearing your voice of excitement,
and sharing every little reaction with you.`
  },
  {
    location: "Sistine Chapel",
    image: "images/5-sistine.png",
    text: `I think this would’ve been one of those moments
where neither of us says much.

Just a look.
A small smile.
And that quiet feeling of,
“I’m really glad I’m here with you, babe.”`
  },
  {
    location: "Sant'Angelo Bridge",
    image: "images/6-santangelo.png",
    text: `Babe, this feels like one of those places
where I would’ve wanted to hold your hand a little tighter.

Not because I’d be afraid of losing you,
but because moments like this
deserve to be felt together, amor ❤️❤️.`
  },
  {
    location: "Walk along the Tiber River",
    image: "images/7-tiber.png",
    text: `Babe, I can already imagine this part so clearly.

Just us walking slowly, holding hands while feeling the promise in our hearts,
talking about everything and nothing,
and me wishing the road would stretch
a little longer
so I could stay in that moment with you.`
  },
  {
    location: "Dinner in Trastevere",
    image: "images/8-trastevere.png",
    text: `And this...
this would’ve been my favorite part of the day.

A little table.
Good food.
Rome glowing around us.

And me,
quietly falling in love with you
all over again. And you look even prettier, amor!`
  }
];

const FINAL_NOTE = `Amor, even if I couldn't be there with you physically this time,
please know that a part of me is walking with you through every street,
every monument,
every little beautiful moment of Rome. I'm living it with you through the love you're
carrying for me in your heart, I'm right there with you baby.

I made these because I wanted you to feel me beside you.

And one day, very soon,
we’ll do all of this for real.

Eu Te Amo, meu amor.
Sempre com você. ❤️

— your darling, Abhi`;

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
  const totalScreens = STOPS.length + 1;
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
      <img src="images/1-colosseum.png" alt="Colosseum">
      <img src="images/2-trevi.png" alt="Trevi Fountain">
      <img src="images/3-pantheon.png" alt="Pantheon">
      <img src="images/4-vatican.png" alt="Vatican Museum">
      <img src="images/5-sistine.png" alt="Sistine Chapel">
      <img src="images/6-santangelo.png" alt="Sant'Angelo Bridge">
      <img src="images/7-tiber.png" alt="Tiber River">
      <img src="images/8-trastevere.png" alt="Trastevere">
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
