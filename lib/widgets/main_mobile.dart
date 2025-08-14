import 'package:flutter/material.dart';

import '../constants/colors.dart';

class MainMobile extends StatelessWidget {
  const MainMobile({super.key});

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;
    final screenWidth = screenSize.width;
    final screenHeight = screenSize.height;

    return Container(
      width: screenWidth,
      constraints: BoxConstraints(
        minHeight: 430.0,
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
      child: Column(
        children: [
          // avatar img
          SizedBox(
            height: 40,
          ),
          ShaderMask(
            shaderCallback: (bounds) {
              return LinearGradient(
                colors: [
                  CustomColor.scaffoldBg.withOpacity(0.6),
                  CustomColor.scaffoldBg.withOpacity(0.6),
                ],
              ).createShader(bounds);
            },
            blendMode: BlendMode.srcATop,
            child: CircleAvatar(
              radius: 100,
              child: ClipOval(
                child: Image.network(
                  'assets/my_avatar.jpg',
                  width: screenWidth,
                ),
              ),
            ),
          ),
          SizedBox(
            height: 10,
          ),

          // ! intro text
          Text(
            "Hi! I'm Buzurgmehr \nMobile Developer",
            style: TextStyle(
              fontSize: 24.0,
              fontWeight: FontWeight.bold,
              color: CustomColor.whitePrimary,
            ),
          ),
          SizedBox(
            height: 15,
          ),
          // ! btn
          SizedBox(
            width: 180.0,
            height: 50,
            child: ElevatedButton(
              onPressed: () {},
              child: Text('Get in touch'),
            ),
          ),
        ],
      ),
    );
  }
}
