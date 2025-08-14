import 'package:flutter/material.dart';

import '../constants/colors.dart';
import '../constants/skill_items.dart';

class SkillsMobile extends StatelessWidget {
  const SkillsMobile({super.key});

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        maxWidth: 500
      ),
      child: Column(
        children: [
          // ! platforms
          for (int i = 0; i < platformItems.length; i++)
            Container(
              margin: EdgeInsets.only(bottom: 5.0),
              width: double.maxFinite,
              decoration: BoxDecoration(
                color: CustomColor.bgLight2,
                borderRadius: BorderRadius.circular(5),
              ),
              child: ListTile(
                leading: Image.asset(
                  platformItems[i]['img'],
                  width: 26.0,
                ),
                contentPadding: EdgeInsets.symmetric(
                  vertical: 10,
                  horizontal: 20,
                ),
                title: Text(
                  platformItems[i]['title'],
                  style: TextStyle(
                    fontSize: 18,
                  ),
                ),
              ),
            ),
          SizedBox(height: 20),
      
          // ! skills
          ConstrainedBox(
            constraints: BoxConstraints(
              maxWidth: 500
            ),
            child: Wrap(
              spacing: 5,
              runSpacing: 5,
              alignment: WrapAlignment.center,
              children: [
                for(int i = 0; i < skillItems.length; i++)
                  Chip(
                    padding: EdgeInsets.symmetric(
                      vertical: 12.0,
                      horizontal: 14.0,
                    ),
                    backgroundColor: CustomColor.bgLight2,
                    label: Text(skillItems[i]['title']),
                    avatar: Image.asset(skillItems[i]['img']),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
