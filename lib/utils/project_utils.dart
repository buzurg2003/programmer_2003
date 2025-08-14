class ProjectUtils {
  final String image;
  final String title;
  final String subtitle;
  final String? githubLink;
  final String? androidLink;
  final String? webLink;
  final String? desktopLink;

  ProjectUtils({
    required this.image,
    required this.title,
    required this.subtitle,
    this.githubLink,
    this.androidLink,
    this.webLink,
    this.desktopLink,
  });
}

// ! Hobby Projects
List<ProjectUtils> hobbyProjectsUtils = [
  ProjectUtils(
    image: 'assets/projects/subaru_nation.png',
    title: 'Subaru Nation',
    subtitle: 'Subaru Fan App',
    githubLink: 'https://github.com/buzurg2003/subaru_nation.git'
  ),
  ProjectUtils(
    image: 'assets/projects/coffee_app.png',
    title: 'CoffeeApp',
    subtitle: 'A Coffee App Flutter project.',
    githubLink: 'https://github.com/buzurg2003/coffee_app.git'
  ),
  ProjectUtils(
    image: 'assets/projects/epic_edit.png',
    title: 'Epic Edit',
    subtitle: 'A Text Editor Flutter Desktop project.',
    githubLink: 'https://github.com/buzurg2003/epic_edit.git'
  ),
];

// ! College University Projects
List<ProjectUtils> collegeAndUniversityProjectsUtils = [
  ProjectUtils(
    image: 'assets/projects/F1.png',
    title: 'FurnitureApp',
    subtitle: 'A Simple Site in React JS | Graduation Project 2023',
    githubLink: 'https://github.com/buzurg2003/furniture-ecommerce.git',
    webLink: 'https://furniture-ecommerce-app.netlify.app/'
  ),
  ProjectUtils(
    image: 'assets/projects/guna.jpg',
    title: 'GunaMusicPlayer',
    subtitle: 'A Simple Music Player in C# | Course Project 2023',
    githubLink: 'https://github.com/buzurg2003/GunaMusicPlayer.git',
    desktopLink: 'https://github.com/buzurg2003/GunaMusicPlayer/tree/main/Setup/Release'
  ),
  ProjectUtils(
      image: 'assets/projects/A1.png',
      title: 'Apocalypse',
      subtitle: 'A Simple Site in React JS',
      githubLink: 'https://github.com/buzurg2003/Apocalypse---ReactJS.git'
  ),
  ProjectUtils(
    image: 'assets/projects/chat_bot.png',
    title: 'Care Pet Bot',
    subtitle: 'A Simple Music Player in C# | Graduation Project 2025',
    githubLink: 'https://github.com/buzurg2003/chat_bot.git',
  ),
];