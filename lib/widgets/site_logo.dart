import 'package:flutter/material.dart';

import '../constants/colors.dart';

class SiteLogo extends StatelessWidget {
  final VoidCallback? onTap;

  const SiteLogo({
    super.key,
    this.onTap
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Text(
        'Programmer_2003',
        style: TextStyle(
          fontSize: 22,
          fontWeight: FontWeight.bold,
          color: CustomColor.yellowSecondary,
        ),
      ),
    );
  }
}
