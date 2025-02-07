<template>
    <div class="header finisher-header">
      <!-- Floating Emoji Overlay -->
      <div class="emoji-container">
        <span v-for="(emoji, index) in emojis" :key="index" class="emoji" :style="getEmojiStyle()">
          {{ emoji }}
        </span>
      </div>
  
    
    </div>
  </template>
  
  <script >
  import { ref, onMounted } from "vue";
  

  export default{

    setup(){

    
  
  const emojis = ref(["🔥", "💖", "🌟", "💎", "🎉", "✨"]); // Customize emojis
  
  const getEmojiStyle = () => {
    return {
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 5 + 3}s`
    };
  };
  
  onMounted(() => {
    const script = document.createElement("script");
    script.src = "/js/finisher-header.es5.min.js"; // Ensure the file is in public/js
    script.onload = () => {
      if (window.FinisherHeader) {
        new window.FinisherHeader({
          count: 90,
          size: { min: 1, max: 20, pulse: 0 },
          speed: { x: { min: 0, max: 0.4 }, y: { min: 0, max: 0.1 } },
          colors: {
            background: "#e51e50", // Background color
            particles: ["#ffffff", "#87ddfe", "#acaaff", "#1bffc2", "#f88aff"]
          },
          blending: "screen",
          opacity: { center: 0, edge: 0.4 },
          skew: 0,
          shapes: ["c", "s", "t"]
        });
      }
    };
    document.body.appendChild(script);
  });

  return {getEmojiStyle, emojis}

}

}
  </script>
  
  <style scoped>
  /* Full-screen Finisher Header */
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: -1;
  }
  
  /* Floating Emoji Overlay */
  .emoji-container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
  }
  
  /* Emoji animation */
  .emoji {
    position: absolute;
    font-size: 2rem;
    opacity: 0.8;
    animation: floatUp ease-in infinite;
  }
  
  @keyframes floatUp {
    from {
      transform: translateY(100vh);
      opacity: 0;
    }
    to {
      transform: translateY(-10vh);
      opacity: 1;
    }
  }
  
  /* Content should be above the background */
  .content {
    position: relative;
    z-index: 10;
    color: white;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    padding: 20px;
  }
  </style>
  