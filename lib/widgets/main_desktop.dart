import 'package:flutter/material.dart';

import '../constants/colors.dart';

class MainDesktop extends StatelessWidget {
  final Function(int) onItemTap;

  const MainDesktop({
    required this.onItemTap,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;
    final screenWidth = screenSize.width;
    final screenHeight = screenSize.height;

    return Container(
      // height: screenHeight,
      constraints: BoxConstraints(
        minHeight: 650.0,
      ),
      decoration: BoxDecoration(
        image: DecorationImage(
          image: AssetImage('assets/background.png'),
          fit: BoxFit.cover,
          colorFilter: ColorFilter.mode(
            Colors.black.withOpacity(0.3),
            BlendMode.darken,
          ),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                "Hi! I'm Buzurgmehr \nMobile Developer",
                style: TextStyle(
                  fontSize: 30.0,
                  fontWeight: FontWeight.bold,
                  color: CustomColor.whitePrimary,
                ),
              ),
              SizedBox(height: 15),
              SizedBox(
                width: 200,
                height: 50,
                child: ElevatedButton(
                  onPressed: () => onItemTap,
                  child: Text('Get in touch'),
                ),
              ),
            ],
          ),
          CircleAvatar(
            radius: 100,
            child: ClipOval(
              child: Image.network(
                'assets/my_avatar.jpg',
                width: screenWidth,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
