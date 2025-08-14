import 'package:flutter/material.dart';

import '../constants/colors.dart';

class Footer extends StatelessWidget {
  const Footer({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(bottom: 30),
      width: double.maxFinite,
      alignment: Alignment.center,
      child: Text(
        'Made by Buzurgmehr with Flutter',
        style: TextStyle(
          fontWeight: FontWeight.w400,
          color: CustomColor.whiteSecondary
        ),
      ),
    );
  }
}
