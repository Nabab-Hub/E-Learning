import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import "./VideoCon.css";

const APP_ID = "6e83c4795d7f43879152271c93e967f9";
const TOKEN =
  "007eJxTYJgVZV26WMz9omii6U6XgsonC8R3ZqzKeGS09vDZMLMoLUYFBrNUC+NkE3NL0xTzNBNjC3NLQ1MjI3PDZEvjVEsz8zTLnT2Z6Q2BjAyufEeYGBkgEMRnYchNzMxjYAAArykc8w==";
const CHANNEL = "main";

const VideoCon = () => {
  const [client] = useState(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  const [localTracks, setLocalTracks] = useState([]);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [streamJoined, setStreamJoined] = useState(false);

  useEffect(() => {
    remoteUsers.forEach((user) => {
      if (user.videoTrack) {
        user.videoTrack.play(`user-${user.uid}`);
      }
    });
  }, [remoteUsers]);

  const createPlayer = (uid) => (
    `<div class="video-container" id="user-container-${uid}">
      <div class="video-player" id="user-${uid}"></div>
    </div>`
  );

  const joinAndDisplayLocalStream = async () => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);

    const UID = await client.join(APP_ID, CHANNEL, TOKEN, null);
    const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
    setLocalTracks(tracks);

    // Create local video container and play stream
    document
      .getElementById("video-streams")
      .insertAdjacentHTML("beforeend", createPlayer(UID));
    tracks[1].play(`user-${UID}`);
    await client.publish(tracks);

    // Show buttons and set state
    setStreamJoined(true);
  };

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setRemoteUsers((prev) => {
        const updatedUsers = prev.filter((u) => u.uid !== user.uid); // Avoid duplicates
        return [...updatedUsers, user];
      });
    }

    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  };

  const handleUserLeft = (user) => {
    setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
    const userContainer = document.getElementById(`user-container-${user.uid}`);
    if (userContainer) userContainer.remove();
  };

  const leaveAndRemoveLocalStream = async () => {
    for (const track of localTracks) {
      track.stop();
      track.close();
    }
    await client.leave();
    setLocalTracks([]);
    setStreamJoined(false);
    document.getElementById("video-streams").innerHTML = "";
  };

  const toggleMic = async (e) => {
    const micTrack = localTracks[0];
    const isMuted = micTrack.muted;
    await micTrack.setMuted(!isMuted);
    e.target.innerText = isMuted ? "Mic On" : "Mic Off";
  };

  const toggleCamera = async (e) => {
    const cameraTrack = localTracks[1];
    const isMuted = cameraTrack.muted;
    await cameraTrack.setMuted(!isMuted);
    e.target.innerText = isMuted ? "Camera On" : "Camera Off";
  };

  return (
    <div className="app">
      {!streamJoined && (
        <button id="join-btn" onClick={joinAndDisplayLocalStream}>
          Join Stream
        </button>
      )}

      <div id="stream-wrapper">
        <div id="video-streams"></div>

        {streamJoined && (
          <div id="stream-controls">
            <button id="leave-btn" onClick={leaveAndRemoveLocalStream}>
              Leave Stream
            </button>
            <button id="mic-btn" onClick={toggleMic}>
              Mic On
            </button>
            <button id="camera-btn" onClick={toggleCamera}>
              Camera On
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCon;
