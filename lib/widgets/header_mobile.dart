import 'package:flutter/material.dart';

import 'site_logo.dart';

class HeaderMobile extends StatelessWidget {
  final VoidCallback? onLogoTap;
  final VoidCallback? onMenuTap;

  const HeaderMobile({
    super.key,
    this.onLogoTap,
    this.onMenuTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 50.0,
      margin: EdgeInsets.fromLTRB(20, 5, 10, 5),
      // decoration: kHeaderDecoration,
      child: Row(
        children: [
          SiteLogo(
            onTap: onLogoTap,
          ),
          Spacer(),
          IconButton(
            onPressed: onMenuTap,
            icon: Icon(Icons.menu),
          ),
        ],
      ),
    );
  }
}
