"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources

from xblock.core import XBlock
from xblock.fields import Scope, Integer
from xblock.fragment import Fragment


class CommunityEyesXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the CommunityEyesXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/community_eyes.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/community_eyes.css"))
        frag.add_css_url(self.runtime.local_resource_url(self, 'public/css/main.css'))
        frag.add_javascript(self.resource_string("static/js/src/community_eyes.js"))
        frag.initialize_js('CommunityEyesXBlock')
        return frag


    def studio_view(self, context):
        """
        Create a fragment used to display the edit view in the Studio.
        """
        html_str = pkg_resources.resource_string(__name__, "static/html/studio_view.html")
        frag = Fragment(unicode(html_str).format(
                                                    display_name=self.display_name,
                                                    display_description=self.display_description,
                                                    thumbnail_url=self.thumbnail_url
                                                ))
        js_str = pkg_resources.resource_string(__name__, "static/js/src/studio_edit.js")
        frag.add_javascript(unicode(js_str))
        frag.initialize_js('StudioEdit')
        return frag

    @XBlock.json_handler
    def studio_submit(self, data, suffix=''):
        """
        Called when submitting the form in Studio.
        """
        self.display_name = data.get('display_name')
        self.display_description = data.get('display_description')
        self.thumbnail_url = data.get('thumbnail_url')

        return {'result': 'success'}

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("CommunityEyesXBlock",
             """<community_eyes/>
             """),
            ("Multiple CommunityEyesXBlock",
             """<vertical_demo>
                <community_eyes/>
                <community_eyes/>
                <community_eyes/>
                </vertical_demo>
             """),
        ]
