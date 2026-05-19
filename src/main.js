const voiceOptions = document.querySelector(".voice");
const startButton = document.querySelector(".start");
const cancelButton = document.querySelector(".cancel");
const pitchInput = document.querySelector(".pitch");
const rateInput = document.querySelector(".rate");
const volumeInput = document.querySelector(".volume");

speechSynthesis.addEventListener("voiceschanged", () => {
  const voices = speechSynthesis.getVoices();
  voiceOptions.innerHTML = voices
    .map((voice, index) => `<option value="${index}">${voice.name}</option>`)
    .join("");

  // Restaurar la voz guardada
  const saved = localStorage.getItem("selectedVoice");
  if (saved) voiceOptions.value = saved;
});

// Guardar cuando el usuario cambie la voz
voiceOptions.addEventListener("change", () => {
  localStorage.setItem("selectedVoice", voiceOptions.value);
});

startButton.addEventListener("click", () => {
  const text = document.querySelector(".text").value;
  if (!text.trim()) return;

  speechSynthesis.cancel();

  const message = new SpeechSynthesisUtterance(text);
  const index = voiceOptions.selectedIndex;

  message.voice = speechSynthesis.getVoices()[index];
  message.pitch = parseFloat(pitchInput.value);
  message.rate = parseFloat(rateInput.value);
  message.volume = parseFloat(volumeInput.value);

  speechSynthesis.speak(message);
});

cancelButton.addEventListener("click", () => speechSynthesis.cancel());