import 'package:flutter/material.dart';
import 'package:programmer_2003/widgets/project_card.dart';

import '../utils/project_utils.dart';

class ProjectsSection extends StatelessWidget {
  const ProjectsSection({super.key});

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;
    final screenWidth = MediaQuery.of(context).size.width;
    final screenHeight = screenSize.height;

    return Container(
      width: screenWidth,
      padding: EdgeInsets.fromLTRB(25, 20, 25, 20),
      child: Column(
        children: [
          // ! College and University projects
          // College and University projects title
          const Text(
            'College & University projects',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(height: 15),
          // College & University projects cards
          ConstrainedBox(
            constraints: BoxConstraints(
              maxWidth: 900,
            ),
            child: Wrap(
              spacing: 25,
              runSpacing: 25,
              children: [
                for (int i = 0;i < collegeAndUniversityProjectsUtils.length; i++)
                  ProjectCardWidget(
                    project: collegeAndUniversityProjectsUtils[i],
                  ),
              ],
            ),
          ),
          SizedBox(height: 20),

          // ! Hobby projects
          // Hobby projects title
          const Text(
            'Hobby projects',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(height: 15),

          // Hobby projects cards
          ConstrainedBox(
            constraints: BoxConstraints(
                maxWidth: 900
            ),
            child: Wrap(
              spacing: 25,
              runSpacing: 25,
              children: [
                for (int i=0;i<hobbyProjectsUtils.length; i++)
                  ProjectCardWidget(
                    project: hobbyProjectsUtils[i],
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
