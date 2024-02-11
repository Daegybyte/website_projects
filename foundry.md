# Foundry Virtual Tabletop (FoundryVTT)

[Foundry Virtual Tabletop](https://foundryvtt.com/) is a robust and versatile platform designed to facilitate online tabletop role-playing game (RPG) sessions. It provides an immersive virtual space for game masters and players to collaboratively engage in epic adventures. FoundryVTT stands out for its rich feature set, flexibility, and user-friendly interface.


## Why FoundryVTT?

- **Self-Hosting:** FoundryVTT allows for self-hosting, giving game masters control over their virtual tabletop environment.

- **Dynamic Scenes:** Create dynamic and interactive scenes with ease, incorporating sound, animations, and visual effects.

- **Ease of Use:** Intuitive user interface and drag-and-drop functionality make it accessible for both experienced and novice players.

- **Continuous Development:** Regular updates and improvements ensure that FoundryVTT stays at the forefront of virtual tabletop technology.


# Docker and Its Benefits for FoundryVTT

## What is Docker?

[Docker](https://www.docker.com/) is a platform that enables developers to automate the deployment of applications inside lightweight, portable, and self-sufficient containers. Containers package an application and its dependencies into a single unit, ensuring consistency and reproducibility across various environments.

## Why Docker for FoundryVTT?

### 1. **Isolation and Portability:**
   - **Isolation:** Docker containers encapsulate FoundryVTT and its dependencies, providing a consistent and isolated environment. This minimizes conflicts with the host system and other applications.

   - **Portability:** Containers can run consistently on any system with Docker installed. This portability is advantageous for users who wish to deploy FoundryVTT across different servers or share configurations effortlessly.

### 2. **Easy Deployment:**
   - Docker simplifies the deployment process for FoundryVTT. Users can deploy the containerized application by running a single command, reducing the complexities associated with manual installations.

### 3. **Resource Efficiency:**
   - Containers share the host operating system's kernel, making them more resource-efficient compared to traditional virtual machines. This efficiency allows for better utilization of system resources and a smoother FoundryVTT performance.


# Cloudflare Zero Trust for Secure External Access

## Why Cloudflare Zero Trust?

[Cloudflare Zero Trust](https://www.cloudflare.com/zero-trust/) is a security framework designed to enhance the protection of your home server by adopting a "never trust, always verify" approach. This model assumes that no user or system, even those within your network, is automatically trusted. Instead, every access request is verified, minimizing the risk of unauthorized access.

## What Does Cloudflare Zero Trust Offer?

### 1. **Granular Access Control:**
   - Cloudflare Zero Trust provides granular control over who can access your home server. It allows you to define specific access policies based on various criteria such as IP addresses, user roles, and more.

### 2. **User Authentication:**
   - Users attempting to connect to your home server must authenticate themselves, ensuring that only authorized individuals, such as your friends, can access the hosted game.

### 3. **Secure External Access:**
   - With Cloudflare Zero Trust, you can securely expose your home server to the internet. This means your friends can access the game remotely without compromising security.

### 4. **Continuous Monitoring:**
   - The framework continuously monitors access patterns and adapts to changing security landscapes. This proactive approach helps in identifying and mitigating potential threats in real-time.

### 5. **Reduced Attack Surface:**
   - By implementing a Zero Trust model, you significantly reduce the attack surface, making it more challenging for unauthorized users or malicious entities to exploit vulnerabilities on your home server.

## Conclusion

Cloudflare Zero Trust provides a robust security layer for external access to your home server, ensuring that your friends can enjoy the hosted game securely. Its granular control and continuous monitoring make it an effective solution for protecting your server from unauthorized access and potential security threats.
