import 'dart:js' as js;

import 'package:flutter/material.dart';

import '../constants/colors.dart';
import '../constants/size.dart';
import '../constants/sns_links.dart';
import '../widgets/contact_section.dart';
import '../widgets/drawer_mobile.dart';
import '../widgets/footer.dart';
import '../widgets/header_desktop.dart';
import '../widgets/header_mobile.dart';
import '../widgets/main_desktop.dart';
import '../widgets/main_mobile.dart';
import '../widgets/projects_section.dart';
import '../widgets/skills_desktop.dart';
import '../widgets/skills_mobile.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final scaffoldKey = GlobalKey<ScaffoldState>();
  final scrollController = ScrollController();

  final List<GlobalKey> navbarKeys = List.generate(4, (index) => GlobalKey());

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;
    final screenWidth = screenSize.width;

    return LayoutBuilder(
      builder: (context, constraints) {
        final isDesktop = constraints.maxWidth >= kMinDesktopWidth;

        return Scaffold(
          key: scaffoldKey,
          backgroundColor: CustomColor.scaffoldBg,
          endDrawer: isDesktop
              ? null
              : DrawerMobile(
                  onNavItemTap: (int navIndex) {
                    scaffoldKey.currentState?.closeEndDrawer();
                    scrollToSection(navIndex);
                  },
                ),
          body: Column(
            children: [
              if (isDesktop)
                HeaderDesktop(
                  onLogoTap: () {
                    scrollToSection(0);
                  },
                  onNavMenuTap: scrollToSection,
                )
              else
                HeaderMobile(
                  onLogoTap: () {
                    scrollToSection(0);
                  },
                  onMenuTap: () {
                    scaffoldKey.currentState?.openEndDrawer();
                  },
                ),

              // ! Scrollable Content Below Header
              Expanded(
                child: SingleChildScrollView(
                  controller: scrollController,
                  child: Column(
                    children: [
                      SizedBox(key: navbarKeys[0]),
                      const SizedBox(height: 10),

                      // ! Main Section
                      if (isDesktop)
                        MainDesktop(
                          onItemTap: (int navIndex) {
                            scrollToSection(2);
                          },
                        )
                      else
                        const MainMobile(),

                      // ! Skills Section
                      Container(
                        key: navbarKeys[1],
                        width: screenWidth,
                        padding: const EdgeInsets.fromLTRB(25, 20, 25, 60),
                        color: CustomColor.bgLight1,
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Text(
                              'My Skills',
                              style: TextStyle(
                                fontSize: 24,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 20),
                            if (constraints.maxWidth >= kMedDesktopWidth)
                              SkillsDesktop()
                            else
                              SkillsMobile(),
                          ],
                        ),
                      ),

                      // ! Projects
                      ProjectsSection(key: navbarKeys[2]),
                      const SizedBox(height: 30),

                      // ! Contact
                      ContactSection(key: navbarKeys[3]),
                      const SizedBox(height: 30),

                      // ! Footer
                      const Footer(),
                    ],
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  void scrollToSection(int navIndex) {
    if (navIndex == 4) {
      // Open blog link
      js.context.callMethod('open', [SnsLinks.blog]);
      return;
    }

    if (navIndex == 5) {
      // Show language menu
      _showLanguageMenu();
      return;
    }

    // Only 0–3 are valid scroll indexes
    if (navIndex >= 0 && navIndex < navbarKeys.length) {
      final key = navbarKeys[navIndex];
      if (key.currentContext != null) {
        Scrollable.ensureVisible(
          key.currentContext!,
          duration: const Duration(milliseconds: 500),
          curve: Curves.easeInOut,
        );
      }
    }
  }

  void _showLanguageMenu() {
    final RenderBox overlay =
        Overlay.of(context).context.findRenderObject() as RenderBox;

    showMenu(
      context: context,
      position: RelativeRect.fromLTRB(
        overlay.size.width - 150,
        kToolbarHeight,
        20,
        0,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      items: [
        PopupMenuItem(
          value: 'en',
          child: Text('English'),
        ),
        PopupMenuItem(
          value: 'fa',
          child: Text('فارسی'),
        ),
        PopupMenuItem(
          value: 'tj',
          child: Text('тоҷикӣ'),
        ),
      ],
    ).then((value) {
      if (value == 'en') {
      } else if (value == 'fa') {
      } else if (value == 'tj') {
      } else {
        AlertDialog(
          content: Text('Please choose a language'),
        );
      }
    });
  }
}
