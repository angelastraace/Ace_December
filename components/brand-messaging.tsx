export function getBrandMessage(type: string, index = 0): string {
  const subtitles = [
    "Dominate crypto trading with ACE Exchange - the most advanced platform in the galaxy.",
    "Break free from traditional banking limitations and embrace the future of finance.",
    "Experience seamless trading, unmatched security, and innovative features.",
    "Join thousands of traders who have already discovered the ACE advantage.",
    "Where cutting-edge technology meets intuitive design for optimal trading.",
  ]

  switch (type) {
    case "subtitle":
      return subtitles[index % subtitles.length]
    default:
      return subtitles[0]
  }
}
