# datagopro
Testing before releasing/deploying code is a good practice for every coder. Besides corner cases, testing the code against random data is usually a cheaper way to verify the robustness of a code. However, writing the data generator sometimes is not a pleasant and trivial task, and usually doubles the headache: how to make sure the data itself doesn’t contain any flaws? DataGoPro aims to provide a sophisticated data generation scheme to help every coder to generate suitable and abundant random input for specific problems.

Feel free to visist our main page at [datagopro.com](datagopro.com).

# Developers
Please take a look at our [developer guide](https://docs.google.com/document/d/1lCe_XyzD9m9mVYwIB1rWl50h-C2M24pHn_9bJLKuKM4/edit#heading=h.44cluypgtmpk).

<del>We are currently using Trello to keep track of our issues [here](https://trello.com/b/FSQrJgOK/datagopro).</del> All Trello issues have been imported to issue tracker. From now on we are using Github's issue tracker and commit message to monitor the issues.

Try to use servermng.sh to manage server actions. Currently it support:

1. PHP error log monitoring (action_code = monitor);
2. Git pulling (action_code = update).

./servermng.sh {passwd_for_admin} {action_code}.
