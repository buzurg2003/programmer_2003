import 'package:flutter/material.dart';

import '../constants/colors.dart';
import '../constants/nav_items.dart';

class DrawerMobile extends StatelessWidget {
  final Function(int) onNavItemTap;

  const DrawerMobile({
    required this.onNavItemTap,
    super.key
  });

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: CustomColor.scaffoldBg,
      child: ListView(
        children: [
          Align(
            alignment: Alignment.topLeft,
            child: Padding(
              padding: const EdgeInsets.only(
                  left: 20,
                  top: 20,
                  bottom: 20
              ),
              child: IconButton(
                onPressed: () => Navigator.of(context).pop(),
                icon: Icon(Icons.close),
              ),
            ),
          ),
          for(int i = 0; i < navIcons.length; i++)
            ListTile(
              contentPadding: EdgeInsets.symmetric(
                  horizontal: 30.0
              ),
              titleTextStyle: TextStyle(
                  color: CustomColor.whitePrimary,
                  fontWeight: FontWeight.bold,
                  fontSize: 16
              ),
              leading: Icon(navIcons[i]),
              title: Text(navTitles[i]),
              onTap: () {
                onNavItemTap(i);
              },
            ),
        ],
      ),
    );
  }
}
