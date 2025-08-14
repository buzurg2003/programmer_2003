import 'package:flutter/material.dart';
import 'package:programmer_2003/utils/project_utils.dart';

import '../constants/colors.dart';
import 'dart:js' as  js;

class ProjectCardWidget extends StatelessWidget {
  final ProjectUtils project;

  const ProjectCardWidget({
    required this.project,
    super.key
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      clipBehavior: Clip.antiAlias,
      height: 280,
      width: 250,
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          color: CustomColor.bgLight2
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          // ! project image
          Image.asset(
            project.image,
            height: 140,
            width: 250,
            fit: BoxFit.cover,
          ),
          // ! title
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 15, 12, 12),
            child: Text(
              project.title,
              style: TextStyle(
                fontWeight: FontWeight.w600,
                color: CustomColor.whitePrimary,
              ),
            ),
          ),
          // ! subtitle
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 0, 12, 12),
            child: Text(
              project.subtitle,
              style: TextStyle(
                fontSize: 12,
                color: CustomColor.whiteSecondary,
              ),
            ),
          ),
          Spacer(),
          // ! footer
          Container(
            color: CustomColor.bgLight1,
            padding: EdgeInsets.symmetric(
                horizontal: 12,
                vertical: 8
            ),
            child: Row(
              children: [
                Text(
                  'Available on:',
                  style: TextStyle(
                    color: CustomColor.yellowSecondary,
                    fontSize: 12
                  ),
                ),
                Spacer(),

                if (project.androidLink != null)
                  Padding(
                    padding: const EdgeInsets.only(right: 7),
                    child: InkWell(
                      onTap: () {
                        js.context.callMethod("open", [project.androidLink]);
                      },
                      child: Image.asset(
                        'assets/android.png',
                        width: 17,
                      ),
                    ),
                  ),

                if (project.webLink != null)
                  Padding(
                    padding: const EdgeInsets.only(right: 7),
                    child: InkWell(
                      onTap: () {
                        js.context.callMethod("open", [project.webLink]);
                      },
                      child: Image.asset(
                        'assets/web.png',
                        width: 17,
                        height: 17,
                        color: Colors.white,
                      ),
                    ),
                  ),

                if (project.desktopLink != null)
                  Padding(
                    padding: const EdgeInsets.only(right: 7),
                    child: InkWell(
                      onTap: () {
                        js.context.callMethod("open", [project.githubLink]);
                      },
                      child: Image.asset(
                        'assets/desktop.png',
                        width: 17,
                        height: 17,
                        color: Colors.white,
                      ),
                    ),
                  ),

                if (project.githubLink != null)
                  InkWell(
                    onTap: () {
                      js.context.callMethod("open", [project.githubLink]);
                    },
                    child: Image.asset(
                      'assets/github.png',
                      width: 17,
                      height: 17,
                      color: Colors.white,
                    ),
                  ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
