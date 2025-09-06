import 'package:flutter/material.dart';

import 'pages/home_page.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Programmer_2003',
      theme: ThemeData.dark(useMaterial3: true),
      home: HomePage(),
    );
  }
}

// ! https://www.youtube.com/watch?v=ql-BTwMslxQ&list=PLyfGAIknOAuRCyNQerjnQhzsZyt4mpEmj&index=10
